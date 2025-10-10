export const validateFirstName = (name: string): string | null => {
    if(!name || name.trim().length === 0){
        return "Please enter your first name!";
    }
    return null;
}

export const validateLastName = (name: string): string | null => {
    if(!name || name.trim().length === 0){
        return "Please enter your last name!";
    }
    return null;
}

export const validatePhoneNumber = (phone: string): string | null => {
    const phoneRegex = /^[1-9][0-9]{9,15}$/;
    if(!phone){
        return "Please enter a phone number!";
    }
    if(!phoneRegex.test(phone)){
        return "Please enter a valid phone number!";
    }
    return null;
}

export const validateCountryCode = (code: string): string | null => {
    const regex = /^\+[1-9]\d{0,3}$/;
    if(!code){
        return "Please select a country code!";
    }

    if(!regex.test(code)){
        return "Please select a valid country code!";
    }
    return null;
}

export const validateProfileImage = (image: {
    uri: string;
    type?: string;
    fileSize?: number;
}): string | null => {
    if(!image){
        return "Please select a profile image or an avatar!";
    }
    if(!image.uri){
        return "Please provide a URI for the profile image!";
    }
    if(image.fileSize && image.fileSize > 5 * 1024 * 1024){
        return "Profile image file size must be less than 5MB!";
    }
    return null;
}
