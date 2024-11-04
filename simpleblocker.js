// ---
// Coded by: https://odd.rip
// Get it now: https://github.com/OddDevelopment/Simple-Adblock-Detector
// ---

const outbrainErrorCheck = async () => {
    try {
        const resp = await fetch("https://widgets.outbrain.com/outbrain.js");
        const text = await resp.text();

        return false;
    } catch (e) {
        return true;
    }
}

const adligatureErrorCheck = async () => {
    try {
        const resp = await fetch("https://adligature.com/", {
            mode: "no-cors"
        });
        const text = await resp.text();

        return false;
    } catch (e) {
        return true;
    }
}

const quantserveErrorCheck = async () => {
    try {
        const resp = await fetch("https://secure.quantserve.com/quant.js", {
            mode: "no-cors"
        });
        const text = await resp.text();

        return false;
    } catch (e) {
        return true;
    }
}

const adligatureCssErrorCheck = async () => {
    try {
        const resp = await fetch("https://cdn.adligature.com/work.ink/prod/rules.css", {
            mode: "no-cors"
        });
        const text = await resp.text();

        return false;
    } catch (e) {
        return true;
    }
}

const srvtrackErrorCheck = async () => {
    try {
        const resp = await fetch("https://srvtrck.com/assets/css/LineIcons.css", {
            mode: "no-cors"
        });
        const text = await resp.text();

        return false;
    } catch (e) {
        return true;
    }
}

const yieldkitCheck = async () => {
    try {
        const resp = await fetch("https://js.srvtrck.com/v1/js?api_key=40710abb89ad9e06874a667b2bc7dee7&site_id=1f10f78243674fcdba586e526cb8ef08", {
            mode: "no-cors"
        });
        const text = await resp.text();

        return false;
    } catch (e) {
        return true;
    }
}

const setIntervalCheck = () => {
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            resolve(true);
        }, 2000);

        const interval = setInterval(() => {
            const a0b = "a0b";
            if (a0b == "a0b") {
                clearInterval(interval);
                clearTimeout(timeout);
                resolve(false);
            }
        }, 100);
    });
}

const idCheck = async () => {
    const bannerIds = ['AdHeader', 'AdContainer', 'AD_Top', 'homead', 'ad-lead'];
    const bannerString = bannerIds.map((bannerId) => `<div id="${bannerId}">&nbsp;</div>`).join('');
    const dataContainer = document.createElement("div");

    dataContainer.innerHTML = bannerString;
    document.body.append(dataContainer);

    let adblocker = false;
    bannerIds.forEach(id => {
        const elem = document.getElementById(id);

        if (!elem || elem.offsetHeight == 0) {
            adblocker = true;
        }

        elem?.remove();
    })

    return adblocker;
}

const detectedAdblock = async () => {
    const resp = await Promise.all([
        outbrainErrorCheck(),
        adligatureErrorCheck(),
        quantserveErrorCheck(),
        adligatureCssErrorCheck(),
        srvtrackErrorCheck(),
        setIntervalCheck(),
        yieldkitCheck()
    ]);

    const isNotUsingAdblocker = resp.every(r => r == false);

    return !isNotUsingAdblocker;
};

detectedAdblock().then(result => {
    if (result) {
// Clear all existing elements in the body
document.body.innerHTML = '';

// Apply body styles
document.body.style.cssText = `
    background-color: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-size: 24px;
`;

// Create container for the content
const container = document.createElement('div');
container.style.textAlign = 'center';

// Create and add message text
const message = document.createElement('p');
message.textContent = 'Adblocker detected. Please disable your adblocker';

// Create and add button
const button = document.createElement('button');
button.textContent = "I've disabled my ad blocker";
button.style.cssText = `
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
`;
button.onclick = () => location.reload();

// Append elements to container and body
container.appendChild(message);
container.appendChild(button);
document.body.appendChild(container);
    }
});
