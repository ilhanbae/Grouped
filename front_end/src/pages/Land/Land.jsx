import { Link } from 'react-router-dom';
import picture from '../../assets/grouped.png';
import logo from '../../assets/logo.png';

const Land = () => {
    return (
        <div style={{ display: "flex"}}>
            <div style={{ flex: 1, backgroundColor: "lightskyblue", display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                <div><img src={picture} alt='app picture' className="rounded-xl scale-75"/></div>
                <br/>
                <h1 className="text-xl text-black font-bold bg-violet-400 h-auto p-4 rounded-xl" style={{ textAlign: 'center' }}>
                A Collaborative Planner for Your Everyday Life Making Scheduling and Communication Seamless</h1>
                <div><img src={logo} alt='logo' className="rounded-xl scale-50"/></div>
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