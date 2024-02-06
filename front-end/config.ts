const Config = {
    LINKS: {
        HOME: "/",
        UPLOAD: "/upload",
        IMAGE: "/image/:imageId"
    },
    PHOTO: {
        FORMATS: ["image/jpeg", "image/png"]
    },
    LAMBDA_ENDPOINT: import.meta.env.VITE_LAMBDA_ENDPOINT
}

export default Config;