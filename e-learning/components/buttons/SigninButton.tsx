import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'


function SigninButton() {
    const {pending} = useFormStatus()
    return (
        <Button disabled={pending} className={`font-medium w-full mt-5 z-10 mb-3 ${pending ? "bg-[#1f342d]/70" : "bg-[#1f342d] hover:bg-[#1f342d]/95"}`}> {pending ? "Connecting" : "Connect"} </Button>
    )
}

export default SigninButton