(async function() {
  const allowedDiscounts = ["WELCOME10", "SUMMER20", "CARA15"];
  let detectedExtensions = [];
  const isDebugMode = true
  setInterval(() => {
    document.querySelectorAll("div").forEach(div => {
      if (div.shadowRoot === null && div.childElementCount === 0) {
        const computedStyles = window.getComputedStyle(div);
        if (
            computedStyles.fontSize === "16px" &&
            computedStyles.color === "rgb(0, 0, 0)" && // black in RGB
            computedStyles.display === "block"
        ) {
          console.log("Suspicious div detected and removed 1:", div);
          div.remove(); // Remove the div
        }
        if (div.style.cssText === "display: block !important;") {
          console.log("Suspicious div detected and removed 2:", div);
          div.remove();
        }
      }
    });
    document.querySelectorAll("div[data-reactroot]").forEach(div => {
      console.log("React root div detected and removed:", div);
      if (div.shadowRoot === null && div.childElementCount === 0) {
        div.remove(); // Remove the detected div
      }
    });
    const discountList = document.querySelector('ul[aria-label="Discount code or gift card"]');

    if (!discountList) {
      return;
    }

    // Get all discount code <li> elements
    const discountItems = discountList.querySelectorAll("li");

    discountItems.forEach(item => {
      // Find the discount code inside <span class="rermvf1 ...">
      const discountCodeElement = item.querySelector("span.rermvf1");

      if (discountCodeElement) {
        const discountCode = discountCodeElement.textContent.trim();
        if (!allowedDiscounts.includes(discountCode.toUpperCase())) {
          const removeButton = item.querySelector('button[aria-label^="Remove"]');

          if (removeButton) {
            removeButton.click();
          } else {
          }
        }
      }
    });
  }, 1000);

  const cartResponse = await fetch(window.location.origin + "/cart.js");
  const cartData = await cartResponse.json();
  const cartToken = cartData?.token || '';

  async function updateCartAttributes() {
    await fetch(window.location.origin + "/cart/update.js?vsly=t&ignore=veeper", {
      method: "POST",
      headers: {
        'X-Requested-With': "XMLHttpRequest",
        'Content-Type': "application/json;"
      },
      body: JSON.stringify({
        attributes: {
          __sig: detectedExtensions?.length ? btoa(detectedExtensions.join(',')) : '',
          __token: cartToken?.split("?key")?.[0] || '',
          __veeper: !!detectedExtensions?.length
        }
      })
    });
  }

  const browserTypes = {
    c: "chrome",
    e: "chrome",
    o: "chrome",
    m: "moz",
    s: "safari"
  };

  const extensionSelectors = {
    honey: ["#honeyCheckout", "#honeyContainer"],
    capitalone: ["//div[not(node()) and not(@id) and not(@class) and @style='all: initial !important;']", "//div[not(node()) and not(@id) and not(@class) and @style='all: initial !important;']"],
    coupert: ["[coupert-item]"],
    retailmenot: ["[style='all: initial !important;']"],
    cently: ["#catcSiteScript", "#cently-save-money-popup", "#cently-main-popup", "#cently-activate-cashback-popup"],
    hotukdeals: ["[data-brand='hotukdeals']$"],
    couponbirds: ["#coupon-birds-drop-div", "coupon-birds-div-main"],
    ibotta: ["#ibotta-extension-root"],
    klarna: ["[data-klarna-plugin-views-container]"],
    piggy: ["#piggyWrapper"],
    rakuten: ["#rr-style-fonts"],
    befrugal: ["#bf_root[style='z-index: 2147483647 !important;']"],
    simplycodes: ["#SCExtension"]
  };

  const chromeExtensions = {
    nenlahapcbofgnanklpelkaejcehkggg: ["capitalone", "assets/icons/shopping-icon16.png"],
    bmnlcjabgnpnenekpadlanbbkooimhnj: ["honey", "paypal/meta.js"],
    mfidniedemcgceagapgdekdbmanojomk: ["coupert", "image/icon-support.png"],
    hfapbcheiepjppjbnkphkmegjlipojba: ["klarna", "img/pink/logo-48.png"],
    jjfblogammkiefalfpafidabbnamoknm: ["retailmenot", "html/images/icon_16.png"],
    emalgedpdlghbkikiaeocoblajamonoh: ["karma", "img/logo_prod_supported.png"],
    chhjbpecpncaggjpdakmflnfcopglcmi: ["rakuten", "img/icon/icon-32.png"],
    hgipopnedpcknmapfakdedlnjjkmpnao: ["checkmate", "assets/48-logo.png"],
    kegphgaihkjoophpabchkmpaknehfamb: ["cently", "images/sample_image.png"],
    eoolfmmapnkhandljfaaofncecfakljd: ["hotukdeals", "icon.png"],
    gfkpklgmocbcbdabfellcnikamdaeajd: ["simplycodes", "icons/16.png"],
    jpdapbcmfllbpojmkefcikllfeoahglb: ["slickdeals", "src/contentScript/global/index.js"],
    logldmlncddmdfcjaaljjjkajcnacigc: ["befrugal", "icon48.png"],
    pnedebpjhiaidlbbhmogocmffpdolnek: ["couponbirds", "dist/js/inject.js"],
    mfaedmjlefifhnhpgipjjiiekchaimpk: ["ibotta", "icons/ibotta_icon_production_32.png"],
    gngocbkfmikdgphklgmmehbjjlfgdemm: ["swagbutton", "assets/icons/16.png"],
    kiiaghlmeikbpmeabhilfphikfcefljn: ["capitalone", "assets/icons/shopping-icon16.png"],
    amnbcmdbanbkjhnfoeceemmmdiepnbpp: ["honey", "paypal/meta.js"],
    pefhciejnkgdgoahgfeklebcbpmhnhhd: ["coupert", "image/logo.svg"],
    fhlidomodkicgjafmppbblmgbkdcjpad: ["retailmenot", "html/images/icon_16.png"],
    jkagfomdekeocgkicjolfkpciipclpkb: ["karma", "img/logo_prod_supported.png"],
    gmmlpenookphoknnpfilofakghemolmg: ["rakuten", "img/icon/icon-32.png"],
    jdompdabnlkaafhkondnfdleieaebgkd: ["piggy", "img/piggy.png"],
    boijkogogijcdbpifnjbbmompieodaoi: ["cently", "images/sample_image.png"],
    miinnegdklndgaidbnmkmdnjohhdcgjb: ["vouchercodes", "images/vc-icon.svg"],
    fgfaoebkidonmphkllbnbnjobjdkhhpm: ["hotukdeals", "public/icon.png"],
    onkfibnhmkfjacdcodpdfdlmnhjleafm: ["simplycodes", "icons/16.png"],
    agolbjnlfbpfaolelbbaeelfkfhiclgp: ["befrugal", "icon48.png"],
    jkdkbjmbppokkkjhedmhpmdjbckelnen: ["swagbutton", "assets/icons/16.png"]
  };

  const firefoxExtensions = {
    "b6db354d-a99f-4d77-9c29-e8db10a94b03": ["capitalone", "assets/icons/shopping-icon16.png"],
    "c5a76bf0-ecb0-4384-a2d8-77471bbd14c4": ["honey", "paypal/meta.js"],
    "64147096-5906-4f31-947c-92f92e9e9836": ["coupert", "image/icon-support.png"],
    "6e78608a-5c32-4a58-b9dd-8fd18afdffca": ["retailmenot", "image/icon-support.png"],
    "59003f98-f8e2-416e-9079-97c4c2a2003c": ["rakuten", "img/icon/icon-64.png"],
    "e00bffa0-95c7-4de0-b988-45632e23e16e": ["hotukdeals", "public/icon.png"],
    "5dd5657d-47d4-426e-9bc4-871eb16a9291": ["pouch", "static/16x16-active.png"],
    "beafd2b9-2c23-4ac9-8776-12f8899e1b41": ["simplycodes", "icons/16.png"],
    "288bca68-28cc-4940-8fe4-9e7c857a8317": ["slickdeals", "src/contentScript/global/index.js"],
    "f2606949-f910-4964-982d-3351de6cd3a3": ["befrugal", "icon48.png"],
    "fe23eb54-a2d6-437f-b688-50a7dfd7da76": ["couponbirds", "dist/js/jquery.js"]
  };

  const extensionsByBrowser = {
    c: chromeExtensions,
    m: firefoxExtensions
  };

  const userAgent = navigator.userAgent;
  const browserPatterns = {
    o: /opera|opr/i,
    e: /edg|edga|edgios/i,
    c: /chrome|chromium|crios/i,
    m: /firefox|fxios/i,
    s: /safari/i
  };

  const detectedBrowsers = Object.keys(browserPatterns)
      .filter(browser => browserPatterns[browser].test(userAgent));

  if (isDebugMode) console.time('CB');

  for (const browser of detectedBrowsers) {
    let extensionIds = Object.keys(extensionsByBrowser[browser] || []);
    let detectionPromises = extensionIds.map(async id => {
      return new Promise(async resolve => {
        let [extensionName, resourcePath] = extensionsByBrowser[browser][id];
        const fileExtension = resourcePath.split('.').pop();
        const resourceUrl = `${browserTypes[browser]}-extension://${id}/${resourcePath}`;

        const elementTypes = {
          jpg: "img",
          png: "img",
          css: "link",
          svg: "img",
          js: "script"
        };

        if (isDebugMode) console.log('here exte', resourceUrl);

        const elementConfig = {
          ext: fileExtension,
          typ: elementTypes[fileExtension]
        };
        if (isDebugMode) console.log('here exte', elementConfig);

        const probeElement = document.createElement(elementTypes[fileExtension]);
        probeElement.style.width = "0px !important";
        probeElement.style.height = "0px !important";
        probeElement.onload = () => {
          resolve(extensionName);
          probeElement.remove();
        };

        probeElement.onerror = () => {
          resolve(null);
          probeElement.remove();
        };

        probeElement[elementTypes[fileExtension] === "link" ? "href" : "src"] = resourceUrl;
        document.body.appendChild(probeElement);
      });
    });

    if (detectionPromises.length) {
      Promise.allSettled(detectionPromises)
          .then(results => {
            if (isDebugMode) console.timeEnd('CB');
            let detectedNames = results
                .filter(result => result.value)
                .map(result => result.value);

            window?.dispatchEvent(new CustomEvent("attribute:change", {
              detail: detectedNames
            }));
          })
          .catch(error => {
            if (isDebugMode) console.dir(error);
          });
    }
  }

  window.addEventListener("attribute:change", async function(event) {
    if (isDebugMode) {
      console.log("change");
      console.log(event.detail);
      console.dir("Attribute Change:");
      console.dir(event.detail);
    }

    let changedAttributes = event.detail;
    let hasNewExtensions = false;

    changedAttributes?.forEach(attr => {
      if (!detectedExtensions.includes(attr)) {
        hasNewExtensions = true;
        detectedExtensions.push(attr);
      }
    });

    if (hasNewExtensions) {
      const extensionData = { _a51: detectedExtensions };
      console.log('AaaAAAAAAAAAAAAAA------------>>>>>>>>>>>', extensionData)
      if (isDebugMode) console.dir(extensionData);
      // updateCartAttributes();
    }
  });

  if (isDebugMode) console.dir("Working CB");

  const querySelector = selector => {
    let resultType = XPathResult.FIRST_ORDERED_NODE_TYPE;
    return selector.startsWith('//')
        ? document.evaluate(selector, document, null, resultType, null).singleNodeValue
        : document.querySelector(selector);
  };

  const domObserver = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(node => {
        if (mutation.type === "childList") {
          console.log("Discount code list updated. Running check...");
          removeUnwantedDiscounts();
        }
        if (node.nodeType === 1) { // Ensure the node is an element
          const shadowHost = node;
          console.log('shadowHost');
          console.log(shadowHost);
          // Check for specific patterns in the div
          if (
              shadowHost.tagName === 'DIV' && // Check if it's a div
              shadowHost.shadowRoot === null && // Shadow root is closed (returns null)
              shadowHost.childElementCount === 0 // No children initially
          ) {
            console.log("Suspicious div detected:", shadowHost);

            // Remove the div
            shadowHost.remove();
          }
        }
      });
      if (mutation.type === "childList") {
        let newlyDetected = [];

        for (const [extensionName, selectors] of Object.entries(extensionSelectors)) {
          for (const selector of selectors) {
            let shouldRemove = !selector.endsWith('$');
            let element = querySelector(shouldRemove ? selector : selector.slice(0, -1));
            if (element && shouldRemove) {
              if (shouldRemove) {
                element.remove();
              }
              if (!newlyDetected.includes(extensionName) &&
                  !detectedExtensions.includes(extensionName)) {
                newlyDetected.push(extensionName);
              }
            }
          }
        }

        if (newlyDetected?.length) {
          window?.dispatchEvent(new CustomEvent("attribute:change", {
            detail: newlyDetected
          }));
        }
      }
    }
  });

  domObserver.observe(document.body, { childList: true, subtree: true });
})();
