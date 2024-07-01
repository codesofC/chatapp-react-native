import { View, Image, Text, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { getUser, signIn } from '@/lib/Firebase'
import { useGlobalContext } from '@/context/GlobalContext/useGlobalContext'
import { UserProps } from '@/types'


const SignIn = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {setIsConnected, setUser} = useGlobalContext()


  const submitData = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please, fill all inputs!");
    }

    setIsSubmitting(true)

    await signIn(form.email, form.password)
    .then(async (userId) => {
      if(userId){
        await getUser(userId)
        .then(userData => {
          setIsConnected(true)
          setUser(userData as UserProps)
        })
        .catch(error => {
          Alert.alert("Error", "Failed fetching user signIn: ", error.message);
        })
        router.replace("/chatlist")
      }
    })
    .catch((error) => {
      Alert.alert("Error", "Error sign in user: ", error.message)
    })
    .finally(() => {
      setIsSubmitting(false)
    })
  }


  return (
    <SafeAreaView className="flex-1 justify-center items-center w-full">
      <LinearGradient colors={["#1A91DA", "#FFF"]} className="w-full h-full items-center justify-center">
        <View className="w-full h-full flex flex-col items-center justify-center gap-6">
          <Image
            source={require("../../assets/images/logo2.png")}
            resizeMode="contain"
            className="w-28 h-28"
          />

          <View className="w-full px-8 flex flex-col">
            <InputField 
              title='Email'
              type='email-address'
              value={form.email}
              changeFormFn={e => setForm(prev => ({...prev, email: e}))}
            inputStyles='mt-4'
            />

            <InputField 
              title='Password'
              value={form.password}
              changeFormFn={e => setForm(prev => ({...prev, password: e}))}
              inputStyles='mt-8'
            />
            <View className='w-full mt-4'>
              <View className='w-full flex-row'>
                <Text className='text-xs'> I don't have account. </Text>
                <Link href={'/signup'} className='text-xs underline text-primary font-bold'> Sign up </Link>
              </View>
              <Link href={'/'} className='text-xs underline text-primary font-bold mt-2'> Forget password? </Link>
            </View>

            <CustomButton 
              title='Sign In'
              pressButtonFn={submitData}
              buttonStyle='mt-8 bg-primary'
              textStyle='text-primary-foreground'
              isSubmitting={isSubmitting}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default SignIn