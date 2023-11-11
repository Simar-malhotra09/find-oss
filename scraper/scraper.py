"""
Perform web scraping on the Y Combinator website to retrieve startup company names and store them in a JSON file.

Usage:
1. python scraper.py

Note: Respect politeness and avoid excessive requests that may overload the server.
"""

import time
import json
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

def webScrape() -> list:

    """Web scrape YCombinator to retrieve company names and descriptions."""
    driver = webdriver.Chrome()
    driver.get("https://www.ycombinator.com/companies/")

    iterations = 100 
    for _ in range(iterations):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")  # scroll to the end of the page
        time.sleep(0.15)  # wait time to allow site to load

    names = []
    i=0

    
    name_elements = driver.find_elements(By.CLASS_NAME, "_coName_lx3q7_454")
    desc_elements = driver.find_elements(By.CLASS_NAME, "_coDescription_lx3q7_479")

        # Iterate through the list of elements
    for name_element, desc_element in zip(name_elements, desc_elements):

            # Append company information to the names list

            company = {
                'id': i+1,
                'name': name_element.text,
                'desc': desc_element.text
            }
            
            desc = list((desc_element.text).lower().split(" "))  
            if "open" in desc:
                names.append(company)
                print(company)
                i+=1

            # Break out of the loop if you've collected information for the first 10 companies
            if len(names) >= 10:
                break
    driver.quit()
    
    return names


def convertJSON(names: list) -> None:
    """Convert list of company names to JSON file."""
    with open('companyNames.json', 'w', encoding='utf-8') as f:
        json.dump(names, f, ensure_ascii=False, indent=4)


if __name__ == '__main__':
    companyNames = webScrape()
    convertJSON(companyNames)

