export class Regex {
    // Regex pour le prénom (lettres uniquement, entre 2 et 30 caractères)
    static firstNameRegex = /^[A-Za-z]{2,30}$/;

    // Regex pour le nom (lettres uniquement, entre 2 et 30 caractères)
    static lastNameRegex = /^[A-Za-z]{2,30}$/;

    // Regex pour l'email (format standard)
    static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regex pour le mot de passe (minimum 8 caractères, au moins une lettre majuscule, une minuscule, un chiffre, et un caractère spécial)
    static passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    validate(firstName, lastName, email, password) {
        return {
            nameValid: Regex.firstNameRegex.test(firstName),
            lastNameValid: Regex.lastNameRegex.test(lastName),
            emailValid: Regex.emailRegex.test(email),
            passwordValid: Regex.passwordRegex.test(password)
        }
    }
}
