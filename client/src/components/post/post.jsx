import { useEffect, useState } from "react"
import axios from 'axios'
import { Button } from 'primereact/button';
import Posts from "./Posts"
import { Card } from 'primereact/card';
import UpdatePost from "./UpdatePost";


const Post = (props) => {
    // console.log("dd");
    const {post}=props
    const {setpostData}=props
   
    const {index}=props
    
    const [visible, setVisible] = useState(false);

    const deletePost = async (props) => {
        const id = post._id
        try{
        const res = await axios.delete(`http://localhost:7002/api/posts/${id}`)
        if(res.status===200){
        setpostData(res.data)

        }
        }catch(err){}
    }
    
    const header = (
        <img  src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (
        <>
        
            <Button label="update" icon="pi pi-check" onClick={() => {return setVisible(true)}}/>
            <Button label="delete" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={() => {return deletePost()}}    />
             {visible?<UpdatePost post={post}setVisible={setVisible} visible={visible}setpostData={setpostData} getPosts={props.getPosts}/>:<></>}
        </>
    );
    
   

    
    return (<>
        {<Card title={post.title}  footer={footer} header={header} className="md:w-25rem">
        <p className="m-0">
                {post.body}
        </p>
        </Card>}</>)

        
}



export default Post;