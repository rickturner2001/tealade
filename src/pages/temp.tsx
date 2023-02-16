import { api } from "../utils/api"
import categoriesData from "../categories.json"

const Temp = () => {

    const { mutate, isError, isSuccess } = api.products.blukCreateNewCategory.useMutation()

    const handleMutation = () => {
        const labels = categoriesData.map(category => category.categoryFirstName)
        const ids = categoriesData.map(category => category.categoryFirstId)

        mutate({ ids: ids, label: labels })
    }

    return <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-900">
        <button
            onClick={handleMutation}
            className="px-5 py-2 rounded-md bg-emerald-500 text-white font-bold">Mutate</button>

        {isSuccess ? <div className="bg-green-500/20 text-green-700 p-3">Successfully added categories</div> : isError ? <div className="bg-red-500/20 text-red-800 rounded-md p-3">There has been an erorr</div> : <></>}
    </div>
}


export default Temp