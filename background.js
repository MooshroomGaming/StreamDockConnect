let device;
let vendorId;

// Function to set vendor ID from user input
function setVendorId(inputId) {
    vendorId = parseInt(inputId, 16); // Convert hex string to integer
    console.log("Vendor ID set to:", vendorId);
}

// Request access to the USB device
async function connectToDevice() {
    try {
        if (!vendorId) {
            console.error("Vendor ID is not set.");
            return;
        }
        
        const devices = await navigator.usb.requestDevice({
            filters: [{ vendorId: vendorId }]
        });
        device = devices;
        
        await device.open();
        await device.selectConfiguration(1);
        await device.claimInterface(0);
        console.log("Stream Dock connected!");
    } catch (error) {
        console.error("USB Connection Error: ", error);
    }
}

chrome.runtime.onInstalled.addListener(() => {
    console.log("StreamDock Connect Extension Installed");
});

chrome.action.onClicked.addListener(() => {
    connectToDevice();
});