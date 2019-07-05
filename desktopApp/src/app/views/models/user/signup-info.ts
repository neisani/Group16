export class SignUpInfo {
    email: string;
    roles: string[];
    password: string;
    username: string;
    name: string;

    constructor(userame: string,name: string, email: string, password: string, roles: string) {
        this.username = userame;
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = [roles];
    }

    
}
