import "../styles/home.css";
import Carousel from 'react-material-ui-carousel'

const Home = () => {
    const images = ["https://images.pexels.com/photos/3761520/pexels-photo-3761520.jpeg?auto=compress&cs=tinysrgb&w=1200&h=650&dpr=2",
        "https://images.pexels.com/photos/4049459/pexels-photo-4049459.jpeg?auto=compress&cs=tinysrgb&w=1200&h=650&dpr=2",
        "https://images.pexels.com/photos/4050362/pexels-photo-4050362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
    return (
        <div className="home" >
            <div>

                <Carousel autoPlay={true} interval={2500} animation="fade" indicatorContainerProps={{ style: { display: "none" } }}>
                    {images.map((e) => {
                        return (

                            <div style={{ backgroundColor: "#DCDCDC"}}>
                                <img src={e} width="1180px" height="650px" style={{ marginLeft: "3rem" }} alt="home image" />
                            </div>
                        )
                    })}

                </Carousel>
            </div>
        </div>
    );
}

export default Home;