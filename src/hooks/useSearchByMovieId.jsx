import { useEffect } from "react"


const useSearchByMovieId = (api, dep, setData) => {
    // fetching logic
    useEffect(() => {
        // setLoading(true)
        // setError('')
        const fetchData = async () => {
            try {
                const res = await fetch(api)

                if (!res) {
                    throw new Error()
                }

                const data = await res.json()
                // if(data.Error === 'Movie not found!') {
                //     setError(data.Error)  
                // } 

                setData(data)
            } 
            catch(error) {
                // setError(error.message)
                console.log(error.message)
            }
            finally {
                // setLoading(false)
            }

            return
        }

        fetchData()
    }, [dep])
}

export default useSearchByMovieId