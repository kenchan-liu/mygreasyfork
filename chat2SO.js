// ==UserScript==
// @name         ChatGPT to StackOverflow Style
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make ChatGPT look like StackOverflow
// @author       KENT
// @match        *://chatgpt.com/*
// @grant        GM_addStyle
// @run-at       document-end

// ==/UserScript==
(function() {
    'use strict';
    console.log("hello");
    let newArticleCount = 0;
    const imageSources = [
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eaad2b46-555a-401e-b221-a113a9a3fc72/dio33wz-fcd5aeb2-79fe-4728-b3b7-f448a856d442.png/v1/fill/w_927,h_145,q_80,strp/ad1_by_happytompson_dio33wz-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ1IiwicGF0aCI6IlwvZlwvZWFhZDJiNDYtNTU1YS00MDFlLWIyMjEtYTExM2E5YTNmYzcyXC9kaW8zM3d6LWZjZDVhZWIyLTc5ZmUtNDcyOC1iM2I3LWY0NDhhODU2ZDQ0Mi5wbmciLCJ3aWR0aCI6Ijw9OTI3In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.SJ6BEifcxCWD5JYbLENd48u3WBj5EOeQMnjiK-ZO-F4',
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eaad2b46-555a-401e-b221-a113a9a3fc72/dio33w2-70f7c6a9-e996-4e3a-82c3-716005adb068.png/v1/fill/w_864,h_141,q_80,strp/ad4_by_happytompson_dio33w2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQxIiwicGF0aCI6IlwvZlwvZWFhZDJiNDYtNTU1YS00MDFlLWIyMjEtYTExM2E5YTNmYzcyXC9kaW8zM3cyLTcwZjdjNmE5LWU5OTYtNGUzYS04MmMzLTcxNjAwNWFkYjA2OC5wbmciLCJ3aWR0aCI6Ijw9ODY0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.uQDdr3MQfelwOsZU4tMcCZmcH3uxZSLvqc0GgIQjQuE',
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eaad2b46-555a-401e-b221-a113a9a3fc72/dio33vx-43b5d274-dd56-439a-ba3a-b9a1b4e4ce67.png/v1/fill/w_929,h_148,q_80,strp/ad5_by_happytompson_dio33vx-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ4IiwicGF0aCI6IlwvZlwvZWFhZDJiNDYtNTU1YS00MDFlLWIyMjEtYTExM2E5YTNmYzcyXC9kaW8zM3Z4LTQzYjVkMjc0LWRkNTYtNDM5YS1iYTNhLWI5YTFiNGU0Y2U2Ny5wbmciLCJ3aWR0aCI6Ijw9OTI5In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.8T7NTeHlOgpfuh-7S0QLNc10eXSKlbksid5RHuu6jk4',
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eaad2b46-555a-401e-b221-a113a9a3fc72/dio33wb-ac92d4f1-96b3-439a-b72e-c5fa8b493a51.png/v1/fill/w_889,h_142,q_80,strp/ad3_by_happytompson_dio33wb-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyIiwicGF0aCI6IlwvZlwvZWFhZDJiNDYtNTU1YS00MDFlLWIyMjEtYTExM2E5YTNmYzcyXC9kaW8zM3diLWFjOTJkNGYxLTk2YjMtNDM5YS1iNzJlLWM1ZmE4YjQ5M2E1MS5wbmciLCJ3aWR0aCI6Ijw9ODg5In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.5cTdKbBPb53YDZkebZRW7eyeo_AtmUS6a4i_bEt6gis',
    ];

    // Function to select a random image from the array
    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * imageSources.length);
        return imageSources[randomIndex];
    }

    // Function to add an image to an article
    function addImageToArticle(article) {
        // Check if the article already has an image
        const existingImage = article.querySelector('img');
        if (!existingImage) {
            // Create the image element
            const image = document.createElement('img');
            image.src = getRandomImage(); // Set the src to a randomly selected image
            image.alt = 'Random image below article'; // Set alt text
            image.style.width = '60%'; // Image width as a percentage of the parent container
            image.style.height = 'auto'; // Maintain aspect ratio
            image.style.left = '50%'; // Move the left side of the image to the center of the parent
            image.style.transform = 'translateX(35%)'; // Offset the image by half its width to the left


            // Append the image below the current article
            article.appendChild(image);
        }
    }
    window.onload = () => {
        setTabIcon("https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Stack_Overflow-512.png");
    };

    const interval = setInterval(() => {
        const articles = document.querySelectorAll('article');

        if (articles.length > 0) {
            console.log(`Found ${articles.length} articles`);

            // 对每个符合条件的 article 添加图片
            articles.forEach((article, index) => {
                if (!article.dataset.imageAdded && Math.random() < 0.5) {
                    const image = document.createElement('img');
                    image.src = getRandomImage();
                    image.alt = 'Random image below article';
                    image.style.width = '60%'; // Image width as a percentage of the parent container
                    image.style.height = 'auto'; // Maintain aspect ratio
                    image.style.left = '50%'; // Move the left side of the image to the center of the parent
                    image.style.transform = 'translateX(35%)'; // Offset the image by half its width to the left
                    article.appendChild(image);
                    article.dataset.imageAdded = 'true'; // 避免重复处理
                    console.log(`Image added to article ${index}`);
                }
            });

            // 如果找到目标元素，停止轮询
            clearInterval(interval);
        }
    }, 500); // 每隔 500 毫秒检查一次



    // Add StackOverflow-like styles
    GM_addStyle(`
        body { font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; background-color: #f9f9f9; }
        .Pane { background-color: #ffffff; border: 1px solid #e1e4e8; }
        .Header { background-color: #f48024; color: white; padding: 8px 10px; font-size: 16px; font-weight: bold; }
        .Messages { padding: 20px; color: #242729; font-size: 14px; }
        .left-sidebar-class { display: none; }
    `);
    window.addEventListener('load', function() {
        const sidebarReplacement = document.createElement('img');
        sidebarReplacement.src = "https://raw.githubusercontent.com/kenchan-liu/mygreasyfork/refs/heads/main/0241202111344.png"; // Use the raw image link from GitHub
        sidebarReplacement.alt = "Sidebar Replacement";
        sidebarReplacement.style.cssText = 'position: fixed; top: 40px; left: 0; width: 640px; height: auto;'; // Customize this style as needed

        const container = document.querySelector('body'); // You might need to change 'body' to a more specific container depending on the structure of ChatGPT
        if (container) {
            container.appendChild(sidebarReplacement);
        }
    });
    // Custom navigation bar setup
    const navBar = document.createElement("div");
    navBar.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 60px; background-color: #ffffff; z-index: 1000; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-top: 3px solid #f48024;';
    document.body.prepend(navBar);

    function setTabIcon(iconUrl) {
        let links = document.querySelectorAll("link[rel*='icon']");
        links.forEach(node => {
            node.parentNode.removeChild( node )
        })
        let link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = iconUrl;
        document.getElementsByTagName('head')[0].appendChild(link);
    }


    if (!document.getElementById("observer")) {
        // Create a MutationObserver to watch for added articles
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                // Check if new nodes are added
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'ARTICLE') {
                        newArticleCount++; // Increment the counter for new articles

                        // When two new articles are added, add an image to the second one
                        if (newArticleCount === 2) {
                            addImageToArticle(node); // Add image to the second article
                            newArticleCount = 0; // Reset the counter
                        }
                    }
                });
            });
        });

        // Configure the observer to watch for added child nodes (new articles)
        const config = { childList: true, subtree: true };

        // Start observing the body (or a more specific container)
        observer.observe(document.body, config);
    }

    // Add custom navigation bar
    if (!document.getElementById("customNavBar")) {
        navBar.id = "customNavBar";
        navBar.style.position = "fixed";
        navBar.style.top = "0";
        navBar.style.left = "0";
        navBar.style.width = "100%";
        navBar.style.height = "60px";
        navBar.style.backgroundColor = "#ffffff";
        navBar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        navBar.style.borderTop = "3px solid #f48024";
        navBar.style.display = "flex";
        navBar.style.alignItems = "center";
        navBar.style.paddingLeft = "20px";
        navBar.style.justifyContent = "space-between";
        navBar.style.paddingRight = "100px";
        const navImage = document.createElement("img");
        navImage.src = "https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.png";
        navImage.alt = "StackOverflow Logo";
        navImage.style.height = "40px";
        navImage.style.margin = "10px";
        navImage.style.zIndex = 1000000;
        navBar.style.zIndex = 100;
        navBar.appendChild(navImage);
        document.body.prepend(navBar);


    }

    // Add long right-side image
    if (!document.getElementById("scrollingImage")) {
        const scrollImage = document.createElement("img");
        scrollImage.id = "scrollingImage";
        scrollImage.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eaad2b46-555a-401e-b221-a113a9a3fc72/dio2ux6-1d55ff84-f687-4b02-a3d5-0a252731ebe2.png/v1/fill/w_394,h_3000/stackoverflow_background_image_by_happytompson_dio2ux6-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzAwMCIsInBhdGgiOiJcL2ZcL2VhYWQyYjQ2LTU1NWEtNDAxZS1iMjIxLWExMTNhOWEzZmM3MlwvZGlvMnV4Ni0xZDU1ZmY4NC1mNjg3LTRiMDItYTNkNS0wYTI1MjczMWViZTIucG5nIiwid2lkdGgiOiI8PTM5NCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.CyB1W5iTEM5sHWOf1-qEt0WDBcBFpcb25JwQixJFjbY";
        scrollImage.alt = "Scrolling Image";
        scrollImage.style.position = "absolute";
        scrollImage.style.top = "0";
        scrollImage.style.right = "0";
        scrollImage.style.width = "300px";
        scrollImage.style.height = "100%";
        scrollImage.style.zIndex = "500";
        scrollImage.style.objectFit = "cover";
        document.body.appendChild(scrollImage);
    }

    // Function to remove all existing SVG elements
    function removeAllSVGs() {
        const svgs = document.querySelectorAll('svg');
        svgs.forEach(svg => svg.remove());
    }
    removeAllSVGs();
})();
