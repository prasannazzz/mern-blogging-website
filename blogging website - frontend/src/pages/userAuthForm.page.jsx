import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
const UserAuthForm = ({ type }) => {
    return (
        // <div><h1>{type}</h1></div>
        <section className="h-cover flex items-center justify-center">
            <form className="w-[80%] max-w-[400px]">
                <h1 className="text-4xl font-gelasio capitalise text-center">
                    {type === "sign-in" ? "Welcome Back" : "Join us Today"}
                </h1>
                {

                    type != "sign-in" ?
                        <InputBox
                            name="fullname"
                            type="text"
                            id="fullname"
                            placeholder="Full Name"
                            icon="fi-rr-user"

                        /> : null

                }
                <InputBox
                    name="email"
                    type="text"
                    id="email"
                    placeholder="Email"
                    icon="fi-rr-envelope"

                />
                <InputBox
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    icon="fi-rr-key"

                />

                <button className="btn-dark center mt-14" type="submit">
                    {type.replace("-", " ")}
                </button>


                <div className=" relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                    <hr className="w-1/2 border-black" />
     <p>or</p>
                    <hr className="w-1/2 border-black" />
                </div> 

                <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center" type="button">
                    <img src={googleIcon} alt="Google Icon" className="w-5" />
                    continue with google
                </button>

                {
                    type === "sign-in" ?
                    <p className="mt-6 text-dark-grey text-xl text-center">
                        Don't have an account? 
                        <Link to="/signup" className="text-black underline text-xl ml-1">
                        Join Us today
                        
                        </Link>
                    </p>
                    :
                    <p className="mt-6 text-dark-grey text-xl text-center">
                        Already have an account? 
                        <Link to="/signin" className="text-black underline text-xl ml-1">
                        Sign In here
                        
                        </Link>
                    </p>
                }

            </form>
    </section>
    );
}
export default UserAuthForm;