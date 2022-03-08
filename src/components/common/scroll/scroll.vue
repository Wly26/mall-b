<template>
    <div class="scrollwrap" ref="scrollwrap">
        <div class="scrollcontent">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: "scroll",
    data(){
        return{
            scroll:{}
        }
    },
    mounted(){
        // 这样获取元素，不太好
        // console.log(document.querySelector('.scrollwrap'))
        this.scroll = new BScroll(this.$refs.scrollwrap,{
            // 2.XX版本，要设置这个属性
            observeDOM: true,
            // 点击事件保持响应
            click:true
        })
    },
    methods: {
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      }
    }
}
</script>

<style lang="scss" scoped>
// .scrollwrap{
//     .scrollcontent{

//     }
// }
</style>
