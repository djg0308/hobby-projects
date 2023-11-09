import React from 'react'

export default function Spinner() {
  return (
    <div>
      <div className='card'>
                <div>
                    <p>I'm loading</p>
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                    <p>Please wait ...</p>
        </div>
    </div>
  )
}
