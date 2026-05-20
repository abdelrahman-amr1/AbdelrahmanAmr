import time
import os
from selenium import webdriver
from selenium.webdriver.edge.options import Options

def capture_screenshots():
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--window-size=1280,720')
    options.add_argument('--hide-scrollbars')
    
    driver = webdriver.Edge(options=options)
    
    os.makedirs('assets/screenshots', exist_ok=True)
    
    projects = [
        {'url': 'http://localhost:8080/CIPT/index.html', 'name': 'cipt-screen.png'},
        {'url': 'http://localhost:8080/carbon-footprint-platform-main/dist/index.html', 'name': 'carbon-screen.png'},
        {'url': 'http://localhost:8080/Carbon-Footprint-Results-main/Carbon-Footprint-Results-main/index.html', 'name': 'results-screen.png'},
        {'url': 'http://localhost:8080/flashcards-game-main/index.html', 'name': 'flashcards-screen.png'},
        {'url': 'http://localhost:8080/Altahera-Management-System/index.html', 'name': 'altahera-screen.png'},
        {'url': 'http://localhost:8080/radiance-ris-main/dist/index.html', 'name': 'radiance-screen.png'},
    ]
    
    for p in projects:
        print(f"Capturing {p['name']}...")
        driver.get(p['url'])
        time.sleep(2)  # wait for animations
        driver.save_screenshot(f"assets/screenshots/{p['name']}")
        print(f"Saved {p['name']}")
        
    driver.quit()

if __name__ == '__main__':
    capture_screenshots()
