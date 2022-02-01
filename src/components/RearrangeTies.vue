<template>
<div>
    <h3>Rearrange tied candidates</h3>
    <hr/>
    <h2 v-if="this.department === null">Loading...</h2>
        <table class="table" v-if="this.department !== null">
            <thead>
                <tr>
                    <th>Candidate name</th>
                    <th>Team</th>
                    <th>Vote count</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(candidate, index) in this.department.qualifiedCandidates" :key="index">
                    <template v-if="candidate.tied === true">
                    <td><strong>{{ candidate.name }}</strong></td>
                    <td><strong>{{ candidate.team }}</strong></td>
                    <td><strong>{{ candidate.voteCount }}</strong></td>
                    </template>
                    <template v-else>
                    <td>{{ candidate.name }}</td>
                    <td>{{ candidate.team }}</td>
                    <td>{{ candidate.voteCount }}</td>
                    </template>
                    <td>
                        <button v-if="candidate.tied" class="btn btn-secondary" style="margin-right:10px" :disabled="!canbeMovedUp(index)" @click="moveCandidate(index, index - 1)">Move up</button>
                        <button v-if="candidate.tied" class="btn btn-secondary" :disabled="!canbeMovedDown(index)" @click="moveCandidate(index, index + 1)">Move down</button>
                    </td>
                </tr>
            </tbody>
        </table>
        
    <div class="row">
      <div class="form-group">
        <button class="btn btn-primary" @click="reArrange()">Confirm rearrangements</button>
      </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BaseService } from "@/services/base-service";
import { IDepartment } from "@/domain/IDepartment";

@Component
export default class ViewCandidates extends Vue {
    @Prop() department: IDepartment | null = null;

    mounted(): void {
        const service = new BaseService<IDepartment>("");
        service.get().then((data) => {
            this.department = data.data! as IDepartment;
        });
    }
    next(): void {
        this.$emit('nextComponent')
    }

    canbeMovedUp(index: number): boolean {
        if (index !== 0) {
            if (this.department!.qualifiedCandidates[index - 1].voteCount === this.department!.qualifiedCandidates[index].voteCount) {
                return true;
            }
        }
        return false;
    }

    canbeMovedDown(index: number): boolean {
        if (index !== this.department!.qualifiedCandidates.length - 1) {
            if (this.department!.qualifiedCandidates[index + 1].voteCount === this.department!.qualifiedCandidates[index].voteCount) {
                return true;
            }
        }
        return false;
    }

    moveCandidate(initialIndex: number, finalIndex: number): void {
        this.department!.qualifiedCandidates.splice(finalIndex, 0, this.department!.qualifiedCandidates.splice(initialIndex,1)[0])
    }

    async reArrange(): Promise<void> {
        console.log(this.department);
        const service = new BaseService<IDepartment>("rearrange");
        await service.post(this.department!).then((data) => {
            if (data.statusCode >= 200 && data.statusCode < 300) {
                this.$emit('nextComponent');
            }
        });
    }
}
</script>