export const apiResponse = (success,message,data =null) => ({
    success,
    message,
    data,
    timestamp : new Date()
})