import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'

function SignupButton() {
    const {pending} = useFormStatus()
    return (
        <Button disabled={pending} className={`font-medium w-full mt-5 z-10 mb-3 ${pending ? "bg-[#1f342d]/70" : "bg-[#1f342d] hover:bg-[#1f342d]/95"}`}> {pending ? "Creating Account..." : "Create Account"} </Button>
    )
}

export default SignupButton