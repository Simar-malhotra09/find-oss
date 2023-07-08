import time
import json
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


def webScrape() -> list:
    driver = webdriver.Chrome()
    driver.get("https://www.ycombinator.com/companies/")

    # Force scroll (to see all 1000 companies)
    iterations = 100
    for _ in range(iterations):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight)") # scroll to the end of the page
        time.sleep(0.18) # wait time to allow site to load

    # Find all company names
    elements = driver.find_elements(By.CLASS_NAME, "CBY8yVfV0he1Zbv9Zwjx")

    # Aggregate all company names into list
    names = [e.text for e in elements]
    driver.quit()
    return names

def convertJSON(names: list) -> None:
    with open('companyNames.json', 'w', encoding='utf-8') as f:
        json.dump(names, f, ensure_ascii=False, indent=4)


if __name__ == '__main__':
    companyNames = webScrape()
    convertJSON(companyNames)

