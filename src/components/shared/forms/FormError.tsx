import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertTriangle} from "lucide-react";

interface FormErrorProps {
    message?: string | undefined;
}

const FormError = ({message}: FormErrorProps) => {

    if (!message) return null;

    return (
        <Alert variant="destructive" className="fira-go">
            <AlertTriangle className="h-4 w-4"/>
            <AlertTitle/>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    );
};

export default FormError;