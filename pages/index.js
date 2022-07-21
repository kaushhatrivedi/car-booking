import App from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import AppContext from '../components/AppContext'
import Canvas from '../components/Canvas'

export default function Home() {
  const router = useRouter()
  const {
    canvas, ctx,
    graph, nodes, vertices,
    resetcanvas, setresetcanvas,
    findRouteShort, findRouteFast
  } = useContext(AppContext)
  const [source, setsource] = useState(nodes[0])
  const [destinationOptions, setdestinationoptions] = useState(vertices)
  const [destination, setdestination] = useState(destinationOptions?.[1])

  // Set source
  const handleChangeSource = e => {
    setsource(e.target.value)
  }

  // Set destination
  const handleChangeDestination = e => {
    setdestination(e.target.value)
  }

  // Reset Canvas (Reload window, reset everything)
  const clearCanvas = () => {
    router.reload(window.location.pathname)
  }

  // Show all vertices except source in destination
  useEffect(() => {
    setdestinationoptions(
      vertices.filter((item) => item!=source)
    )
  }, [source])

  return (
    <div>
      <Head>
        <title>Cab Booking</title>
        <meta name="description" content="Booking your ride got so easy!" />
        <link rel="icon" href="/cab.png" type="image/png" />
      </Head>

      <main>
        <div className="buttons">
          <div className="pickup">
            <label htmlFor="pickup">Pickup Point</label>
            <select id="pickup" onChange={handleChangeSource} value={source}>
              {
              vertices.map((elem, index) => {
                return <option key={index} val={index}>{elem}</option>
              })
              }
            </select>
          </div>
          <div className="destination">
            <label htmlFor="destination">Destination Point</label>
            <select id="destination" onChange={handleChangeDestination} value={destination}>
              {
                destinationOptions.map((elem, index) => {
                  return <option key={index} val={index}>{elem}</option>
                })
              }
            </select>
          </div>
          <div className='functions'>
            <button className="go" onClick={findRouteShort}>Shortest!</button>
            <button className="go fast" onClick={findRouteFast}>Fastest!</button>
            <button className="reset" onClick={clearCanvas}>Reset</button>
          </div>
        </div>

        <Canvas />

      </main>
    </div>
  )
}
