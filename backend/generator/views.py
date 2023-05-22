from django.shortcuts import render, redirect
from django.http import JsonResponse

import openai
import os

OPENAI_API_KEY = str(os.getenv("OPENAI_API_KEY"))
openai.api_key = OPENAI_API_KEY

def chat(request):
    try:
        messages = request.session.get('messages', [])
        prompt = request.POST.get('prompt')
        temperature = float(request.POST.get('temperature', 0.1))

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

        return JsonResponse(
            {
                'messages': messages,
                'formattedResponse': formatted_response,
            }
        )
    except Exception as e:
        print(e)
        return redirect('error_handler')
from django.shortcuts import render, redirect
from django.http import JsonResponse

import openai
import os

OPENAI_API_KEY = str(os.getenv("SECRET_KEY"))
openai.api_key = OPENAI_API_KEY

def chat(request):
    try:
        messages = request.session.get('messages', [])
        prompt = request.POST.get('prompt')
        temperature = float(request.POST.get('temperature', 0.1))

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

        return JsonResponse(
            {
                'messages': messages,
                'formattedResponse': formatted_response,
            }
        )
    except Exception as e:
        print(e)
        return redirect('error_handler')
