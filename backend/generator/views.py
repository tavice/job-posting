from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

import openai
import os
import json

OPENAI_API_KEY = str(os.getenv("OPENAI_API_KEY"))
# print('OPENAI_API_KEY is', OPENAI_API_KEY)
openai.api_key = OPENAI_API_KEY


@require_POST
@csrf_exempt
def chat(request):
    try:
        # if the session does not have a messages key, create one
        if "messages" not in request.session:
            request.session["messages"] = [
                {
                    "role": "system",
                    "content": "You are now chatting with a job recruiter. The recruiter will provide you with comprehensive, clear, and cordial answers regarding job offers.",
                },
            ]

        if request.method == "POST":
            messages = request.session["messages"]
            body = json.loads(request.body)
            prompt = body.get("prompt")
            temperature = body.get("temperature")

            # Append user message to messages
            messages.append({"role": "user", "content": prompt})

            # Format messages for OpenAI API
            formatted_messages = [
                {"role": message["role"], "content": message["content"]}
                for message in messages
            ]

            formatted_messages.append({"role": "user", "content": prompt})

            print("formatted_messages are", formatted_messages)

            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=formatted_messages,
                temperature=temperature,
                max_tokens=1000,
            )

            formatted_response = response["choices"][0]["message"]["content"]
            messages.append({"role": "assistant", "content": formatted_response})
            request.session["messages"] = messages

            print("formatted_response is", formatted_response)
            print("messages are", messages)

            return JsonResponse(
                {
                    'messages': messages,
                    "formattedResponse": formatted_response,
                }
            )
        else:
            return JsonResponse({"error": "Invalid request"})
    except Exception as e:
        print(e)
        return JsonResponse({"error": str(e)})

    # ===========================================================================#
    # Clear the chat


@require_POST
@csrf_exempt
def clear_chat(request):
    if "messages" in request.session:
        del request.session["messages"]
    return JsonResponse({"status": "success"})
