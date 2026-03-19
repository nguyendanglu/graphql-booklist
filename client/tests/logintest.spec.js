// @ts-check
import { test, expect } from '@playwright/test';

test('login page has title', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page).toHaveTitle(/GraphQL Bookstore/);
});

test('login page has heading', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.getByRole('heading', { name: 'Login to GraphQL Bookstore' })).toBeVisible();
});

test('login page has username field', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.getByLabel('Username:')).toBeVisible();
});

test('login page has password field', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.getByLabel('Password:')).toBeVisible();
});

test('login page has submit button', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('login page has error message 2', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByLabel('Username:').fill('admin');
    await page.getByLabel('Password:').fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('No such user found')).toBeVisible();
});

test('login page has error message 3', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByLabel('Username:').fill('Shinichi');
    await page.getByLabel('Password:').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid password')).toBeVisible();
});

test('login page has success login', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByLabel('Username:').fill('Shinichi');
    await page.getByLabel('Password:').fill('MoriRan');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('No book selected...')).toBeVisible();
});
