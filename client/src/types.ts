export interface RegisterDataProps {
    registerData: {
        email: string;
        password: string;
        avatar: string | File;
        username: string;
        first_name: string;
        last_name: string;
    };
    setRegisterData: React.Dispatch<React.SetStateAction<{
        email: string;
        password: string;
        avatar: string | File;
        username: string;
        first_name: string;
        last_name: string;
    }>>;
}
