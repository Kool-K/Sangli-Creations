# Sangli Creations - Official Website

> **A premium, responsive e-commerce catalog for Authentic Indian Home Decor.**

![Status](https://img.shields.io/badge/Status-Prototype%20Ready-success)
![Platform](https://img.shields.io/badge/Platform-Web-blue)

## 📖 Overview

This repository contains the source code for the **Sangli Creations** website. It is designed as a **Single Page Application (SPA)** that provides a seamless, app-like experience for browsing products, managing wishlists, and making direct enquiries via WhatsApp.

The design reflects the brand's heritage with a **"Royal Indian" aesthetic**, utilizing a Maroon & Gold color palette, ornate typography, and high-quality imagery.

## 🌟 Key Features

* **📱 Fully Responsive Design:** Optimized for all devices.
    * *Desktop:* Full navigation bar and hover effects.
    * *Tablet (iPad):* Smart adaptive layout with touch-friendly spacing.
    * *Mobile:* App-style interface with a slide-out hamburger menu.
* **🔍 Advanced Product Discovery:**
    * **Live Search:** Instantly find products by name or category.
    * **Smart Filtering:** Filter by categories (Brass, Textiles, Decor, etc.).
    * **Sorting:** Sort items by Featured, A-Z, or Z-A.
* **❤️ Persistent Wishlist:**
    * Customers can "heart" items to add them to a wishlist.
    * The list is **saved automatically** to the user's device (no login required).
    * **"Enquire All"** button sends a single WhatsApp message with the entire list.
* **💬 Direct WhatsApp Integration:**
    * Replaces the traditional "Add to Cart" with a direct "Enquire" button.
    * Opens a pre-filled WhatsApp chat with the specific product name.
* **✨ Interactive UI:**
    * **Zoom & Slide:** Hovering over product cards reveals a second image and zooms in.
    * **Seamless Navigation:** "About Us" and other pages load instantly without refreshing.

---

## 🛠️ Tech Stack

* **HTML5:** Semantic structure.
* **CSS3:** Custom styling with CSS Variables for consistent theming.
* **JavaScript (ES6):** Logic for filtering, sorting, wishlist management, and view switching.
* **FontAwesome:** For vector icons (hearts, search, social media).
* **Google Fonts:** *Playfair Display* (Headings) and *Lato* (Body text).

---

## 🚀 Setup & Deployment

### 1. Local Development
To run this project on your computer:
1.  Clone this repository.
2.  Ensure you have an `assets` folder with your product images (`image1.png`, `image2.png`, etc.) and the logo (`image_7b61a5.png`).
3.  Open `index.html` in any modern web browser (Chrome, Safari, Edge).

### 2. Deployment (GitHub Pages)
This project is ready for instant hosting via GitHub Pages for client preview.
1.  Go to the **Settings** tab of this repository.
2.  Scroll to **Pages**.
3.  Under **Source**, select `main` (or `master`) branch.
4.  Click **Save**.
5.  Share the generated link with the client.

### 3. Domain Migration (Future Step)
Since the domain has already been purchased:
1.  In GitHub Pages settings, enter the custom domain (e.g., `www.sanglicreations.com`).
2.  Update the DNS settings (A records/CNAME) at the domain registrar to point to GitHub's servers.

---

## 📂 Project Structure

```text
/
├── index.html       # Main structure and content
├── style.css        # Visual styling, colors, and responsive rules
├── script.js        # Logic for wishlist, sorting, and data
├── README.md        # Documentation
├── image_7b61a5.png # Website Favicon & Logo
└── assets/          # Folder containing product images
    ├── image1.png
    ├── image2.png
    └── ...

```

## 🎨 Color Palette Reference

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Maroon** | `#800020` | Primary buttons, headers, borders |
| **Temple Gold** | `#C0B283` | Accents, highlights, badges |
| **Heritage Cream** | `#FDF5E6` | Backgrounds, cards |
| **Charcoal** | `#333333` | Body text |

## 📞Support
For technical support or updates, please contact the developer.
Developed by: Ketaki Kulkarni