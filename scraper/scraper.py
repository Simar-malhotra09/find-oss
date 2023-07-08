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
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import json

driver = webdriver.Chrome()
driver.get("https://www.ycombinator.com/companies/")

# The YC Startup Directory | Y Combinator
print(driver.title)

# Force scroll (to see all 1000 companies) -- NOT WORKING
iterations = 10
for i in range(iterations):
    driver.find_element("tag name", "body").send_keys(Keys.END)
    driver.implicitly_wait(2)

elements = driver.find_elements(By.CLASS_NAME, "CBY8yVfV0he1Zbv9Zwjx")

print(f'Number of elements found: {len(elements)}')
print(elements)

for e in elements:
    print(e.text)


driver.quit()
