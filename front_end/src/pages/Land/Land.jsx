import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Land = () => {
    return (
        <div style={{ display: "flex", height: "100vh", margin: 0}}>
            <div style={{ flex: 1, backgroundColor: "lightskyblue", display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                <div><img src={logo} alt='logo' className="rounded-xl" style={{width:'30vw'}}/></div>
                <br/>
                <h1 className="text-3xl text-black font-bold bg-violet-400 h-auto p-4 rounded-xl" style={{ textAlign: 'center' }}>A Multi-Purpose Planner for Your Everyday Life</h1>
            </div>
            <div style={{ flex: 1, backgroundColor: "lightgray", display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                <div style={{width:'100%', paddingLeft: "25px", paddingRight: "25px"}}>
                    <Link to="/signup"><button className="w-full h-auto p-4 transition-colors duration-150 bg-yellow-500 focus:shadow-outline text-black font-bold text-4xl hover:bg-gray-400 rounded-l">Sign Up</button></Link>
                </div>
                <br/>
                <div style={{width:'100%', paddingLeft: "25px", paddingRight: "25px"}}>
                    <Link to="/login"><button className="w-full h-auto p-4 transition-colors duration-150 bg-yellow-500 focus:shadow-outline text-black font-bold text-4xl hover:bg-gray-400 rounded-l">Login</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Land;