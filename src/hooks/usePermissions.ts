import useLoginStore from '@/store/login/login'

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  return !!permissions.find((item: any) => item.includes(permissionID))
}

export default usePermissions
