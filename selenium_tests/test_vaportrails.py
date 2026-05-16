"""
VaporTrails - Selenium Test Suite
Tests: Homepage, Navigation, Forum, Community, Auth page
"""

import os
import time
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


BASE_URL = os.environ.get("APP_URL", "http://localhost:3000")


@pytest.fixture(scope="module")
def driver():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")

    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    yield driver
    driver.quit()


# ─────────────────────────────────────────
# TEST 1: Homepage loads correctly
# ─────────────────────────────────────────
def test_homepage_loads(driver):
    """Check that the homepage loads and has the correct title"""
    driver.get(BASE_URL)
    time.sleep(2)

    title = driver.title
    print(f"Page title: {title}")

    # Title should contain VaporTrails
    assert "vapor" in title.lower() or "vaportrails" in title.lower(), \
        f"Expected VaporTrails in title, got: {title}"


# ─────────────────────────────────────────
# TEST 2: Navigation bar is present
# ─────────────────────────────────────────
def test_navbar_present(driver):
    """Check that the navigation bar is rendered on homepage"""
    driver.get(BASE_URL)
    time.sleep(2)

    # Nav should be present (your Nav.tsx component renders a <nav> tag)
    nav = driver.find_element(By.TAG_NAME, "nav")
    assert nav is not None, "Navigation bar not found on homepage"
    assert nav.is_displayed(), "Navigation bar is not visible"


# ─────────────────────────────────────────
# TEST 3: Forum page loads
# ─────────────────────────────────────────
def test_forum_page_loads(driver):
    """Check that the forum page is accessible"""
    driver.get(f"{BASE_URL}/forum")
    time.sleep(2)

    assert "/forum" in driver.current_url, \
        f"Expected /forum in URL, got: {driver.current_url}"

    # Page should have some content rendered
    body = driver.find_element(By.TAG_NAME, "body")
    assert len(body.text) > 0, "Forum page body is empty"


# ─────────────────────────────────────────
# TEST 4: Community page loads
# ─────────────────────────────────────────
def test_community_page_loads(driver):
    """Check that the community page renders"""
    driver.get(f"{BASE_URL}/community")
    time.sleep(2)

    assert "/community" in driver.current_url, \
        f"Expected /community in URL, got: {driver.current_url}"

    body = driver.find_element(By.TAG_NAME, "body")
    assert len(body.text) > 0, "Community page body is empty"


# ─────────────────────────────────────────
# TEST 5: Auth page renders login form
# ─────────────────────────────────────────
def test_auth_page_has_form(driver):
    """Check that the auth page renders a login/signup form"""
    driver.get(f"{BASE_URL}/auth")
    time.sleep(2)

    # Should have an input field (email)
    inputs = driver.find_elements(By.TAG_NAME, "input")
    assert len(inputs) > 0, "No input fields found on auth page"


# ─────────────────────────────────────────
# TEST 6: News page loads
# ─────────────────────────────────────────
def test_news_page_loads(driver):
    """Check that the news page is accessible"""
    driver.get(f"{BASE_URL}/news")
    time.sleep(2)

    assert "/news" in driver.current_url, \
        f"Expected /news in URL, got: {driver.current_url}"

    body = driver.find_element(By.TAG_NAME, "body")
    assert len(body.text) > 0, "News page body is empty"
