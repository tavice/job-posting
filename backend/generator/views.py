from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

import openai
import os

OPENAI_API_KEY = str(os.getenv("OPENAI_API_KEY"))
#print('OPENAI_API_KEY is', OPENAI_API_KEY)
openai.api_key = OPENAI_API_KEY

@require_POST
@csrf_exempt
def chat(request):
    #print('request is', request)
    try:
        messages = request.session.get('messages', [])
        prompt = str(request.POST.get('prompt'))  
        temperature = float(request.POST.get('temperature', 0.1))

        # check what is the prompt
        print('prompt is', prompt)
        print('temperature is', temperature)
        print('messages are', messages)

        messages.append({"role": "user", "content": prompt})

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=temperature,
            max_tokens=1000,
        )

        formatted_response = response['choices'][0]['message']['content']
        messages.append({"role": "assistant", "content": formatted_response})
        request.session['messages'] = messages

        print('formatted_response is', formatted_response)
        print('messages are', messages)

        return JsonResponse(
            {
                'messages': messages,
                'formattedResponse': formatted_response,
            }
        )
    except Exception as e:
        print(e)
        return JsonResponse({'error': str(e)})


