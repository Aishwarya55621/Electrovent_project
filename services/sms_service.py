import requests

FAST2SMS_API_KEY = "4TAewcrimdZxVhK2j167QzUMnHWy9NavBEgfbpIRGtJSlO5uFX5kP6KnO9WCQbjdSGD07VUwEJoFAHYf"

def send_sms(mobile, message):
    url = "https://www.fast2sms.com/dev/bulkV2"

    payload = {
        "route": "v3",
        "message": message,
        "language": "english",
        "numbers": "919168578655"  
    }

    headers = {
        "authorization": FAST2SMS_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    print("================================")
    print("[SMS API RESPONSE]")
    print("To:", mobile)
    print(response.json())
    print("================================")
