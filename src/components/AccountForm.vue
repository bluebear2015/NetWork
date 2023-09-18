<template>
    <form class="card elevation-5 border border-3 border-warning" @submit.prevent="handleSubmit">

        <div class="card-body">
            <div class="form-floating mb-3">
                <input name="name" class="form-control" placeholder="Name" type="text" required v-model="editable.name">
                <label for="name">Name:</label>
            </div>


            <div class="form-floating mb-3">
                <input name="class" class="form-control" placeholder="class" type="text" required v-model="editable.class">
                <label for="class">Class:</label>
            </div>




            <div class="form-floating mb-3">
                <input name="profileName" class="form-control" placeholder="email" type="text" required
                    v-model="editable.email">
                <label for="email">Email:</label>
            </div>

            <div class="form-floating mb-3">
                <input name="bio" class="form-control" placeholder="bio" type="text" required v-model="editable.bio">
                <label for="bio">Bio:</label>
            </div>


            <div class="form-floating mb-3">
                <input name="picture" class="form-control" placeholder="Profile Picture" type="url" required
                    v-model="editable.picture">
                <label for="picture">Picture:</label>
            </div>
            <div class="form-floating mb-3">
                <input name="cover-img" class="form-control" placeholder="cover Image" type="url" required
                    v-model="editable.coverImg">
                <label for="cover-img">Cover Image:</label>
            </div>
            <div class="form-floating mb-3">
                <input name="linkden" class="form-control" placeholder="linkden" type="url" v-model="editable.linkden">
                <label for="linkden">linkden:</label>
            </div>

            <div class="form-floating mb-3">
                <input name="graduated" class="form-control" placeholder="graduated" type="boolean"
                    v-model="editable.graduated">
                <label for="graduated">Graduated:</label>
            </div>

        </div>
        <div class="card-footer text-end">
            <button class="btn btn-outline-primary" type="submit">Save Account</button>
        </div>



    </form>
</template>
  
  
<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';


export default {
    setup() {
        const editable = ref({})

        watchEffect(() => {
            editable.value = { ...AppState.account }
        })


        return {
            editable,
            async handleSubmit() {
                try {
                    await accountService.editAccount(editable.value)
                    logger.log('edited account', editable.value)
                } catch (error) {
                    Pop.error(error, '[Editing Account]')
                }
            }
        }
    }
}
</script>
  
  
<style lang="scss" scoped></style>
  