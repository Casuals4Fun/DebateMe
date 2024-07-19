export interface RegisterDataProps {
    registerData: {
        avatar: string | File
        username: string
        first_name: string
        last_name: string
        email: string
    }
    setRegisterData: React.Dispatch<React.SetStateAction<{
        avatar: string | File
        username: string
        first_name: string
        last_name: string
        email: string
    }>>
}