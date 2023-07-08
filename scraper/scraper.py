# Result was unattainable. -> Swapping to Selenium
# import requests
# from bs4 import BeautifulSoup

# # Making a GET request
# r = requests.get('https://www.ycombinator.com/companies/')

# # Parsing the HTML
# soup = BeautifulSoup(r.content, 'html.parser')

# print(soup.title)

# z = soup.find('span', class_="CBY8yVfV0he1Zbv9Zwjx")
# print(z)
# companyNames = soup.find_all('span', class_='CBY8yVfV0he1Zbv9Zwjx')

# for companyName in companyNames:
#     print(companyName.text)
# print('Complete')

# Selenium Attempt
from selenium import webdriver
import json

driver = webdriver.Chrome()
driver.get("https://www.ycombinator.com/companies/")

# The YC Startup Directory | Y Combinator
print(driver.title)



driver.quit()
