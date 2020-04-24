<template>
    <div class="city_body">
        <div class="city_list">
            <!-- <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li>上海</li>
                </ul>
            </div>
            <div class="city_sort">
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                    </ul>
                </div>	
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
            </ul>
        </div> -->
        <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="item in hotCity" :key="item.id">{{ item.nm}}</li>
                </ul>
        </div>
        <div class="city_sort">
                <div v-for="item in cityList" :key="item.index"> 
                    <h2>{{ item.index}}</h2>
                    <ul>
                        <li v-for="itemList in item.list" :key="itemList.id">{{itemList.nm}}</li>
                    </ul>
                </div>	
        </div>
         <div class="city_index">
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
            </ul>
        </div>
    </div>
</div>    
</template>

<script>
export default {
    name : 'City',
    data(){
        return{
            cityList :[],
            hotCity:[]
        }
    },
    mounted(){
        this.axios.get('/api/cityList').then((res) =>{
            // console.log(res);
            var msg = res.data.msg;
            if(msg === 'ok'){
                var cities = res.data.data.cities;
               var { cityList , hotCity} = this.formatCityList(cities);
               this.cityList = cityList;
               this.hotCity = hotCity;
            }
        })
    },
    methods:{
        formatCityList(cities){
            var cityList = [];
            var hotCity = [];

            for(var i = 0 ;i <cities.length; i++){
                if(cities[i].isHot === 1){
                    hotCity.push(cities[i])
                }
            }

            for(var i = 0 ; i < cities.length; i++){
                // 首字母的筛选
               var firstLetter = cities[i].py.substring(0,1).toUpperCase();
            //    新添加的索引
               if(toCom(firstLetter)){
                     cityList.push({ index : firstLetter , list : [{ nm: cities[i].nm , id : cities[i].id }]})
               }else{  //已有索引
                   for(var j = 0 ; j <cityList.length; j++){
                        if(cityList[j].index === firstLetter){
                            cityList[j].list.push({ nm: cities[i].nm , id : cities[i].id});
                        }
                   }
               }
            }
            // 数组排序
            cityList.sort((n1,n2)=>{
                if(n1.index > n2.index){
                    return 1
                }
                else if(n1.index < n2.index){
                    return -1
                }
                else{
                    return 0
                }
            })
            //  首字母筛选后的整理
               function toCom(firstLetter){
                   for(var i =0 ;i <cityList.length; i++){
                       if(cityList[i].index === firstLetter){
                           return false;
                       }
                   }
                   return true;
               }
            //    console.log(cityList);
            return {
                cityList,
                hotCity
            }
               
        }
    }
}
</script>

<style scoped> 

</style>
