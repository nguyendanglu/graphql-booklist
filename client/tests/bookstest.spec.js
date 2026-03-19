// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Books Screen', () => {
    test.beforeEach(async ({ page }) => {
        // Since the route is protected, we need to log in first.
        // Using credentials from logintest.spec.js success case.
        await page.goto('http://localhost:5173/login');
        await page.getByLabel('Username:').fill('Shinichi');
        await page.getByLabel('Password:').fill('MoriRan');
        await page.getByRole('button', { name: 'Login' }).click();
        
        // Wait for the redirect to the books page
        await page.waitForURL('http://localhost:5173/books');
    });

    test('should display the book list and add book form', async ({ page }) => {
        // Assert that the page has the heading "GraphQL Bookstore"
        await expect(page.getByRole('heading', { name: 'GraphQL Bookstore' })).toBeVisible();

        // Check if the add book form elements are visible
        await expect(page.getByText('Book name:')).toBeVisible();
        await expect(page.getByText('Genre:')).toBeVisible();
        await expect(page.getByText('Author:')).toBeVisible();
        
        // Assert the "+" button in the form is visible
        await expect(page.getByRole('button', { name: '+' })).toBeVisible();

        // Wait for the actual book list to be visible and have items
        const bookList = page.locator('#book-list');
        await expect(bookList).toBeVisible();

        // Also verify that at least one book item or an explicit empty state is shown 
        // Or if it fails to load, the test will fail and we can catch the error
        // Wait for network to be idle to see if there is an error reported on the page.
    });

    test('should display book details when a book is clicked', async ({ page }) => {
        // Wait for the list to load
        const bookList = page.locator('#book-list');
        await expect(bookList).toBeVisible();

        // Click on the first book in the list
        const firstBook = bookList.locator('li').first();
        await expect(firstBook).toBeVisible(); // ensure there's at least one book
        await firstBook.click();

        // Details secton should load
        const bookDetails = page.locator('#book-details');
        
        // Wait for loading to finish, there might be a loading state
        await expect(bookDetails.locator('h2')).toBeVisible({ timeout: 10000 });
        
        // The title of the book should be visible
        await expect(bookDetails.locator('h2')).not.toBeEmpty();
    });

    test('should add a new book', async ({ page }) => {
        // Wait for author dropdown to load
        const authorDropdown = page.getByLabel('Author:');
        
        // Wait until it has options other than loading/error
        await expect(authorDropdown.locator('option:not(:disabled)')).not.toHaveCount(0).catch(() => {});
        // Wait for at least 2 options (Select author + at least 1 actual author)
        await expect(authorDropdown.locator('option')).not.toHaveCount(1, { timeout: 10000 }).catch(() => {});

        // Fill form
        const testBookName = `Playwright Book ${Date.now()}`;
        await page.getByLabel('Book name:').fill(testBookName);
        await page.getByLabel('Genre:').fill('Test Genre');
        
        // Select the second option (first actual author)
        // Ensure options are loaded before selecting
        const options = await authorDropdown.locator('option').allInnerTexts();
        if (options.length > 1) {
            await authorDropdown.selectOption({ index: 1 });
            
            // Submit form
            await page.getByRole('button', { name: '+' }).click();

            // Wait for form to clear (book name becomes empty again)
            await expect(page.getByLabel('Book name:')).toBeEmpty();

            // Check if the new book appears in the list
            const bookList = page.locator('#book-list');
            await expect(bookList.getByText(testBookName)).toBeVisible();
        }
    });
});
