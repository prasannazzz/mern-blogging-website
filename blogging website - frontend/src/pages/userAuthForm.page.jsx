import InputBox from "../components/input.component";

const UserAuthForm= ({type}) => {
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
                    icon = "fi-rr-user"
                
                /> : null
                
              }
              <InputBox
                    name="email"
                    type="text"
                    id="email"
                    placeholder="Email" 
                    icon = "fi-rr-envelope"
                
                />
                <InputBox
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Password" 
                    icon = "fi-rr-key"
                
                />
            </form>
            

        </section>
    );
}
export default UserAuthForm;