import smtplib

EMAIL = ""    #enter  your email
APP_PASSWORD = "" # enter your app_pass


def send_email(message):
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()

        server.login(EMAIL, APP_PASSWORD)

        server.sendmail(
            EMAIL,
            EMAIL,   # receiver (you can change later)
            message
        )

        server.quit()

        print("Email sent successfully")

    except Exception as e:
        print(" Email failed:", e)
