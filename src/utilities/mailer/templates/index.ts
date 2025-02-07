import { verifyAccountTemplate } from "./account-verification-template"
import { resetPasswordTemplate } from "./reset-password-template"

export const templates = (props: any, type: string): string => {
    let template: string = ``
    switch (type) {
        case 'verify-account': template = verifyAccountTemplate({ ...props });
            break;

        case 'reset-password': template = resetPasswordTemplate({ ...props })
    }
    return template
}