import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LinksContainer from '../LinksContainer/LinksContainer';
import { useDispatch, useSelector } from 'react-redux';
import { selectLinks, setLinks, setTags } from '../../redux/slice/slice';

function Links(props) {
  const params = useParams()
  const dispatch = useDispatch()
  const links = useSelector(selectLinks)
  useEffect(() => {
    // fetch links to be displayed
    axios.get(`/user/links/${params.uuid}`, {}, { withCredentials: true }).then(resp => {
      dispatch(setLinks({ links: resp.data.links }))
      dispatch(setTags({ tags: resp.data.tags }))
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <>
      <LinksContainer links={links} />
    </>
  )
}


export default Links