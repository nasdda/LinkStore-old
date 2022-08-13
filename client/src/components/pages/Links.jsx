import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LinksContainer from '../LinksContainer/LinksContainer';
import { useDispatch } from 'react-redux';
import { setLinks, setTags } from '../../redux/slice/slice';

function Links(props) {
  const params = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    // fetch links to be displayed
    axios.get(`/user/links/${params.uuid}`, {}, { withCredentials: true }).then(resp => {
      dispatch(setLinks({ links: resp.data.links }))
      dispatch(setTags({tags: resp.data.tags}))
      console.log('links data: ', resp.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <>
      <LinksContainer />
    </>
  )
}


export default Links