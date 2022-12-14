import React from 'react'

export default function MyAlert(props) {
  return (
    props.msg &&<div className="alert alert-success alert-dismissible fade show" role="alert">
<strong>{props.hed}</strong> {props.msg}
<button type="button" className="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>
  )

}

