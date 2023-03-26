import { Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { StoreOption, UserData } from "../../../utils/typealies";
import WaitingDataBlock from "./waitingdatablock";

const AdminWaitingListContainer = () => {
  const db = getFirestore();
  const firebaseAuth = getAuth();
  const currentUser = firebaseAuth.currentUser?.uid;

  // 현재 가게 대기 정보 가져오기
  const waitingCol = query(
    collection(db, `storeList/${currentUser}/waitingList`)
  );

  const getWaitingData = async () => {
    const waitingState = await getDocs(waitingCol).then((data) => {
      const list: any = [];
      data.forEach((doc) => {
        const userData = doc.data();
        list.push({ ...userData, uid: doc.id });
      });
      list.sort(function (a: any, b: any) {
        return a.createdAt - b.createdAt;
      });
      return list;
    });
    return waitingState;
  };

  const currentWaitingState = useQuery({
    queryKey: ["currentWaitingState"],
    queryFn: getWaitingData,
  });

  // 관리자가 설정한 매장 관리 정보 가져오기
  const getStoreOption = async () => {
    const storeDataState: StoreOption | undefined = await getDocs(
      collection(db, "adminList")
    ).then((data) => {
      let adminData: any;
      data.forEach((doc) => {
        if (doc.data().uid === currentUser) {
          return (adminData = doc.data());
        }
      });
      return adminData!;
    });
    return storeDataState;
  };

  const storeOption = useQuery({
    queryKey: ["storeData"],
    queryFn: getStoreOption,
  });

  return (
    <Flex
      as="article"
      direction="column"
      border="none"
      borderRadius="1rem 1rem 0 0"
      boxShadow="0px 4px 6px rgba(90, 90, 90, 30%)"
      paddingTop="3.5rem"
    >
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        fontSize="1.5rem"
        padding="1rem"
        backgroundColor="#ffffff"
      >
        <Text letterSpacing="-0.1rem">현재 대기팀</Text>
        <Text fontWeight="bold" color="#58a6dc">
          4팀
        </Text>
      </Flex>
      <Flex direction="column" align="center" fontSize="1.25rem">
        {currentWaitingState.data?.map((elem: UserData, index: number) => {
          return (
            <WaitingDataBlock
              key={index}
              userData={elem}
              admin={currentUser!}
              storeOption={storeOption.data!}
              background={index % 2 === 0 ? "#FFFFFF" : "#F4F4F4"}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default AdminWaitingListContainer;
