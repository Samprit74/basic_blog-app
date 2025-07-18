import React from 'react'
import { useNavigate } from 'react-router-dom'
import { get, Base_url } from '../services/Endpoint'
import { useEffect, useState } from 'react'

export const Recentpost = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const handleEvent = (id) => {
        navigate(`/post/${id}`);
    }
    const getpost = async () => {
        try {
            const responce = await get('/blog/getall')
            const data = responce.data
            console.log(data)
            setPosts(data.posts || []);
        }
        catch (err) {
            console.log("error detected", err)
        }
    }
    useEffect(() => {
        getpost();
    }, [])

    return (
        <div className='container'>
            <div className='mb-5 text-center'>
                <h2 className='fw-bold fs-1 text-white '>Recent Post</h2>
            </div>

            <div className='row'>
                {posts && posts.map((post, index) => {
                    return (

                        < div className='col-md-4 col-lg-4 col-xs-12 mb-4' key={post._id || index} >
                            <div className='card border-success' style={{
                                borderWidth: "2px",
                                backgroundColor: "#2b2b2b",
                                borderRadius: "10px",
                                overflow: "hidden",
                                minHeight: "420px", // adjust as needed
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <img src={`${Base_url}/images/${post.image}`}
                                    className='card-img-top img-fluid' alt=""
                                    style={{
                                        width: "220px",         // or any fixed size
                                        height: "220px",
                                        objectFit: "cover",
                                        borderRadius: "50%",    // makes it a perfect circle
                                        margin: "40px auto 0",  // centers the image horizontally
                                        display: ""
                                    }} />
                                <div className='card-body bg-dark text-white'>
                                    <h5 className='card-title '>{post.title}</h5>
                                    <p className='card-text '>{post.desc}</p>
                                    <button className='btn btn-primary w-100 mt-3' onClick={() => handleEvent(post._id)}>Read Article</button>
                                </div>
                            </div>
                        </div>


                    )
                })}
            </div>


        </div >
    )
}
