import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close';


const ProfilePicture = ({ changePic }) => {

    // for show input hidden file input tag
    const hiddenFileInput = useRef(null)

    // for set image
    const [image, setImage] = useState("");

    // for sending image to backend api
    const [url, setUrl] = useState("");


    // send image to cloudinary
    const submitPic = () => {
        console.log(createPost, image)
        const data = new FormData();
        data.append('file', image)
        data.append('upload_preset', 'instagram')
        data.append('cloud_name', 'raushancloud')

        fetch('https://api.cloudinary.com/v1_1/raushancloud/image/upload',
            {
                method: 'post',
                body: data
            }
        ).then(res => {
            return res.json()
        })
            .then(data => {
                // console.log(data.url)
                // setImageUrl(data.url)
                setUrl(data.url)
            })
            .catch(err => console.log(err))

    }


    // send image url to backend api
    const sendPicToApi = () => {
        // saving post data to the api
        fetch('http://localhost:8000/user/profilepic', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                pic: url
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                // if (data.success === true) {
                //     toast.success(data.message);
                //     navigate('/user/home')
                // } else {
                //     toast.error(data.error)
                // }
            })
            .catch(err => { 
                console.log(err)
                // toast.error(err);
            })
    }



    // send image to cloudinary
    useEffect(() => {
        if (image) {
            submitPic()
        }
    }, [image])


    // send image url to backend api
    useEffect(() => {
        if(url){
            sendPicToApi()
        }
    }, [url])




    // for show input hidden file input tag function
    const handleClick = () => {
        hiddenFileInput.current.click()
    }

    

    return (
        <Box>
            <Box sx={{ position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', backgroundColor: 'black', opacity: '0.5' }}></Box>
            <Box sx={{ position: 'fixed', width: '70vw', top: '30%', left: '35%', zIndex: '1000' }}>
                {/* <Button onClick={() => changePic(false)} sx={{ position: 'relative', backgroundColor: 'transparent', left: '40%', color: 'white' }}><CloseIcon /></Button> */}
                {/* <Card sx={{ display: 'flex', flexDirection: 'row', gap: '5px', height: '70vh', width: '40%' }}> */}
                <CardContent sx={{ width: '40%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '20px' }}>
                    <CardMedia
                        component='img'
                        image='https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png'
                        alt=''
                        sx={{ width: '80px', height: '80px', borderRadius: '50%', cursor: 'pointer', textAlign: 'center', margin: '0 41% ' }}
                    />

                    <Typography sx={{ textAlign: 'center', fontSize: '25px', margin: '3% 0' }}>Update Profile Image</Typography>

                    <Button
                        onClick={handleClick}
                        sx={{ textTransform: 'capitalize', fontSize: '18px', fontWeight: '600', borderTop: '1px solid gray' }}>
                        Upload Photo
                    </Button>
                    <input
                        onChange={(e) => { setImage(e.target.files[0]) }}
                        type="file" ref={hiddenFileInput}
                        accept='image/*'
                        style={{ display: 'none' }}
                    />

                    <Button
                        sx={{ color: 'black', textTransform: 'capitalize', fontSize: '18px', borderTop: '1px solid gray' }}>
                        Remove Photo
                    </Button>

                    <Button
                        onClick={() => changePic(false)}
                        sx={{ color: 'black', textTransform: 'capitalize', fontSize: '18px', borderTop: '1px solid gray' }}>
                        Cancel
                    </Button>
                </CardContent>
                {/* </Card> */}
            </Box>
        </Box>
    )
}

export default ProfilePicture