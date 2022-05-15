import {useEffect, useState} from "react";

export const useRequest = (callback: Function, dependencies: any[] = []) => {
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>("");

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const response = await callback()
                setData(response.data)
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        loadData()
    }, dependencies)

    return [data, isLoading, error]
}