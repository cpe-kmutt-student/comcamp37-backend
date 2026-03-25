import { ConflictException, ForbiddenException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import type Geography from "../../data/geography.json";
import geography from "../../data/geography.json";
import schools from "../../data/schools.json";

@Injectable()
export class CalculateScoreService {
	constructor(
		private readonly logger: LoggerService,
		private readonly prisma: PrismaService,
	) {}

	async calculateAndUpdateScore(appId: string) {
		try {
			const calRegis = await this.calculateRegisScore(appId).catch((e) => {
				throw e;
			});
			const calAcademic = await this.calculateAcademicScore(appId).catch((e) => {
				throw e;
			});
			const calAcademicChaos = await this.calculateAcademicChaosScore(appId).catch((e) => {
				throw e;
			});

			// without academic score
			const calTotal = calRegis + calAcademicChaos;

			const updateTotalScore = await this.prisma.applicationTotalScore.upsert({
				where: {
					std_application_id: appId,
				},
				update: {
					std_regis_score: calRegis,
					std_academic_score: calAcademic,
					std_academic_chaos_score: calAcademicChaos,
					std_total_score: calTotal,
				},
				create: {
					std_application_id: appId,
					std_regis_score: calRegis,
					std_academic_score: calAcademic,
					std_academic_chaos_score: calAcademicChaos,
					std_total_score: calTotal,
				},
			});

			// const updateAcademicScore = await this.prisma.applicationTotalScore.update({
			// 	where: {
			// 		std_application_id: appId
			// 	},
			// 	data: {
			// 		std_academic_score: calAcademic
			// 	}
			// })

			return updateTotalScore;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async calculateRegisScore(appId: string): Promise<number> {
		try {
			const application = await this.prisma.studentApplication.findUnique({
				where: {
					std_application_id: appId,
				},
				include: {
					std_status: true,
					std_regis_question: {
						include: {
							stf_regis_question_score: true,
						},
					},
				},
			});

			if (!application) throw new NotFoundException("Regis - Application not found!");

			if (!application.std_status?.stf_regis_question_checked) throw new ConflictException("Regis - Grading is not complete yet");

			const section1Filter = application.std_regis_question.find((q) => q.std_regis_answer_section === "regis_1");
			const section2Filter = application.std_regis_question.find((q) => q.std_regis_answer_section === "regis_2");
			const section3Filter = application.std_regis_question.find((q) => q.std_regis_answer_section === "regis_3");
			const section4Filter = application.std_regis_question.find((q) => q.std_regis_answer_section === "regis_4");
			const section5Filter = application.std_regis_question.find((q) => q.std_regis_answer_section === "regis_5");
			const section6Filter = application.std_regis_question.find((q) => q.std_regis_answer_section === "regis_6");

			if (!section1Filter) throw new ConflictException("Regis - Answer for section 1 not found");
			if (!section2Filter) throw new ConflictException("Regis - Answer for section 2 not found");
			if (!section3Filter) throw new ConflictException("Regis - Answer for section 3 not found");
			if (!section4Filter) throw new ConflictException("Regis - Answer for section 4 not found");
			if (!section5Filter) throw new ConflictException("Regis - Answer for section 5 not found");
			if (!section6Filter) throw new ConflictException("Regis - Answer for section 6 not found");

			const scoreSection1Filter = section1Filter.stf_regis_question_score.filter((sc) => sc.stf_count === 1 || sc.stf_count === 2);
			const scoreSection2Filter = section2Filter.stf_regis_question_score.filter((sc) => sc.stf_count === 1 || sc.stf_count === 2);
			const scoreSection3Filter = section3Filter.stf_regis_question_score.filter((sc) => sc.stf_count === 1 || sc.stf_count === 2);
			const scoreSection4Filter = section4Filter.stf_regis_question_score.filter((sc) => sc.stf_count === 1 || sc.stf_count === 2);
			const scoreSection5Filter = section5Filter.stf_regis_question_score.filter((sc) => sc.stf_count === 1 || sc.stf_count === 2);
			const scoreSection6Filter = section6Filter.stf_regis_question_score.filter((sc) => sc.stf_count === 1 || sc.stf_count === 2);

			if (scoreSection1Filter.length !== 2) throw new ConflictException("Regis - Section 1 grading is not complete yet");
			if (scoreSection2Filter.length !== 2) throw new ConflictException("Regis - Section 2 grading is not complete yet");
			if (scoreSection3Filter.length !== 2) throw new ConflictException("Regis - Section 3 grading is not complete yet");
			if (scoreSection4Filter.length !== 2) throw new ConflictException("Regis - Section 4 grading is not complete yet");
			if (scoreSection5Filter.length !== 2) throw new ConflictException("Regis - Section 5 grading is not complete yet");
			if (scoreSection6Filter.length !== 2) throw new ConflictException("Regis - Section 6 grading is not complete yet");

			const sumScoreSection1 = scoreSection1Filter.map((sc) => sc.stf_score).reduce((a: number, b: number) => a + b, 0);
			const sumScoreSection2 = scoreSection2Filter.map((sc) => sc.stf_score).reduce((a: number, b: number) => a + b, 0);
			const sumScoreSection3 = scoreSection3Filter.map((sc) => sc.stf_score).reduce((a: number, b: number) => a + b, 0);
			const sumScoreSection4 = scoreSection4Filter.map((sc) => sc.stf_score).reduce((a: number, b: number) => a + b, 0);
			const sumScoreSection5 = scoreSection5Filter.map((sc) => sc.stf_score).reduce((a: number, b: number) => a + b, 0);
			const sumScoreSection6 = scoreSection6Filter.map((sc) => sc.stf_score).reduce((a: number, b: number) => a + b, 0);

			const meanScoreSection1 = sumScoreSection1 / scoreSection1Filter.length;
			const meanScoreSection2 = sumScoreSection2 / scoreSection2Filter.length;
			const meanScoreSection3 = sumScoreSection3 / scoreSection3Filter.length;
			const meanScoreSection4 = sumScoreSection4 / scoreSection4Filter.length;
			const meanScoreSection5 = sumScoreSection5 / scoreSection5Filter.length;
			const meanScoreSection6 = sumScoreSection6 / scoreSection6Filter.length;

			const sumMeanScore = meanScoreSection1 + meanScoreSection2 + meanScoreSection3 + meanScoreSection4 + meanScoreSection5 + meanScoreSection6;

			return sumMeanScore;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async calculateAcademicScore(appId: string): Promise<number> {
		try {
			const application = await this.prisma.studentApplication.findUnique({
				where: {
					std_application_id: appId,
				},
				include: {
					std_status: true,
					std_academic_question: {
						include: {
							stf_academic_question_score: true,
						},
					},
				},
			});

			if (!application) throw new NotFoundException("Academic - Application not found!");

			if (!application.std_status?.stf_academic_question_checked) throw new ConflictException("Academic - Grading is not complete yet");

			const section1Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_1");
			const section201Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_201");
			const section202Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_202");
			const section203Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_203");
			const section3Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_3");
			const section4Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_4");
			const section5Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_5");
			const section6Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_6");
			const section7Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_7");
			const section8Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_8");
			const section9Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_9");
			const section10Filter = application.std_academic_question.find((q) => q.std_academic_answer_section === "academic_10");

			if (!section1Filter) throw new ConflictException("Academic - Answer for section 1 not found");
			if (!section201Filter) throw new ConflictException("Academic - Answer for section 201 not found");
			if (!section202Filter) throw new ConflictException("Academic - Answer for section 202 not found");
			if (!section203Filter) throw new ConflictException("Academic - Answer for section 203 not found");
			if (!section3Filter) throw new ConflictException("Academic - Answer for section 3 not found");
			if (!section4Filter) throw new ConflictException("Academic - Answer for section 4 not found");
			if (!section5Filter) throw new ConflictException("Academic - Answer for section 5 not found");
			if (!section6Filter) throw new ConflictException("Academic - Answer for section 6 not found");
			if (!section7Filter) throw new ConflictException("Academic - Answer for section 7 not found");
			if (!section8Filter) throw new ConflictException("Academic - Answer for section 8 not found");
			if (!section9Filter) throw new ConflictException("Academic - Answer for section 9 not found");
			if (!section10Filter) throw new ConflictException("Academic - Answer for section 10 not found");

			const scoreSection1Find = section1Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);
			const scoreSection201Find = section201Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);
			const scoreSection202Find = section202Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);
			const scoreSection203Find = section203Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);
			const scoreSection3Find = section3Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);
			const scoreSection4Find = section4Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);
			const scoreSection5Find = section5Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);
			const scoreSection6Find = section6Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);
			const scoreSection7Find = section7Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);
			const scoreSection8Find = section8Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);
			const scoreSection9Find = section9Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);
			const scoreSection10Find = section10Filter.stf_academic_question_score.find((sc) => sc.stf_count === 1);

			if (!scoreSection1Find) throw new ConflictException("Academic - Section 1 grading is not complete yet");
			if (!scoreSection201Find) throw new ConflictException("Academic - Section 201 grading is not complete yet");
			if (!scoreSection202Find) throw new ConflictException("Academic - Section 202 grading is not complete yet");
			if (!scoreSection203Find) throw new ConflictException("Academic - Section 203 grading is not complete yet");
			if (!scoreSection3Find) throw new ConflictException("Academic - Section 3 grading is not complete yet");
			if (!scoreSection4Find) throw new ConflictException("Academic - Section 4 grading is not complete yet");
			if (!scoreSection5Find) throw new ConflictException("Academic - Section 5 grading is not complete yet");
			if (!scoreSection6Find) throw new ConflictException("Academic - Section 6 grading is not complete yet");
			if (!scoreSection7Find) throw new ConflictException("Academic - Section 7 grading is not complete yet");
			if (!scoreSection8Find) throw new ConflictException("Academic - Section 8 grading is not complete yet");
			if (!scoreSection9Find) throw new ConflictException("Academic - Section 9 grading is not complete yet");
			if (!scoreSection10Find) throw new ConflictException("Academic - Section 10 grading is not complete yet");

			const scoreSection1 = scoreSection1Find.stf_score;
			const scoreSection201 = scoreSection201Find.stf_score;
			const scoreSection202 = scoreSection202Find.stf_score;
			const scoreSection203 = scoreSection203Find.stf_score;
			const scoreSection3 = scoreSection3Find.stf_score;
			const scoreSection4 = scoreSection4Find.stf_score;
			const scoreSection5 = scoreSection5Find.stf_score;
			const scoreSection6 = scoreSection6Find.stf_score;
			const scoreSection7 = scoreSection7Find.stf_score;
			const scoreSection8 = scoreSection8Find.stf_score;
			const scoreSection9 = scoreSection9Find.stf_score;
			const scoreSection10 = scoreSection10Find.stf_score;

			const sumScore = scoreSection1 + scoreSection201 + scoreSection202 + scoreSection203 + scoreSection3 + scoreSection4 + scoreSection5 + scoreSection6 + scoreSection7 + scoreSection8 + scoreSection9 + scoreSection10;

			return sumScore;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async calculateAcademicChaosScore(appId: string): Promise<number> {
		try {
			const application = await this.prisma.studentApplication.findUnique({
				where: {
					std_application_id: appId,
				},
				include: {
					std_status: true,
					std_academic_chaos_question: {
						include: {
							stf_academic_chaos_question_score: true,
						},
					},
				},
			});

			if (!application) throw new NotFoundException("Academic Chaos - Application not found!");

			if (!application.std_status?.stf_academic_chaos_question_checked) throw new ConflictException("Academic Chaos - Grading is not complete yet");

			const section101Filter = application.std_academic_chaos_question.find((q) => q.std_academic_chaos_answer_section === "aptitude_101");
			// const section102Filter = application.std_academic_chaos_question.find(q => q.std_academic_chaos_answer_section === "aptitude_102");
			const section201Filter = application.std_academic_chaos_question.find((q) => q.std_academic_chaos_answer_section === "aptitude_201");
			const section202Filter = application.std_academic_chaos_question.find((q) => q.std_academic_chaos_answer_section === "aptitude_202");
			const section203Filter = application.std_academic_chaos_question.find((q) => q.std_academic_chaos_answer_section === "aptitude_203");
			const section301Filter = application.std_academic_chaos_question.find((q) => q.std_academic_chaos_answer_section === "aptitude_301");

			if (!section101Filter) throw new ConflictException("Academic Chaos - Answer for section 101 not found");
			if (!section201Filter) throw new ConflictException("Academic Chaos - Answer for section 201 not found");
			if (!section202Filter) throw new ConflictException("Academic Chaos - Answer for section 202 not found");
			if (!section203Filter) throw new ConflictException("Academic Chaos - Answer for section 203 not found");
			if (!section301Filter) throw new ConflictException("Academic Chaos - Answer for section 301 not found");

			const scoreSection101Find = section101Filter.stf_academic_chaos_question_score.find((sc) => sc.stf_count === 11);
			const scoreSection201Find = section201Filter.stf_academic_chaos_question_score.find((sc) => sc.stf_count === 21);
			const scoreSection202Find = section202Filter.stf_academic_chaos_question_score.find((sc) => sc.stf_count === 22);
			const scoreSection203Find = section203Filter.stf_academic_chaos_question_score.find((sc) => sc.stf_count === 23);
			const scoreSection301Find = section301Filter.stf_academic_chaos_question_score.find((sc) => sc.stf_count === 31);
			const scoreSection302Find = section301Filter.stf_academic_chaos_question_score.find((sc) => sc.stf_count === 32);
			const scoreSection303Find = section301Filter.stf_academic_chaos_question_score.find((sc) => sc.stf_count === 33);
			const scoreSection304Find = section301Filter.stf_academic_chaos_question_score.find((sc) => sc.stf_count === 34);

			if (!scoreSection101Find) throw new ConflictException("Academic Chaos - Section 101 grading is not complete yet");
			if (!scoreSection201Find) throw new ConflictException("Academic Chaos - Section 201 grading is not complete yet");
			if (!scoreSection202Find) throw new ConflictException("Academic Chaos - Section 202 grading is not complete yet");
			if (!scoreSection203Find) throw new ConflictException("Academic Chaos - Section 203 grading is not complete yet");
			if (!scoreSection301Find) throw new ConflictException("Academic Chaos - Section 301 grading is not complete yet");
			if (!scoreSection302Find) throw new ConflictException("Academic Chaos - Section 302 grading is not complete yet");
			if (!scoreSection303Find) throw new ConflictException("Academic Chaos - Section 303 grading is not complete yet");
			if (!scoreSection304Find) throw new ConflictException("Academic Chaos - Section 304 grading is not complete yet");

			const scoreSection101 = scoreSection101Find.stf_score;
			const scoreSection201 = scoreSection201Find.stf_score;
			const scoreSection202 = scoreSection202Find.stf_score;
			const scoreSection203 = scoreSection203Find.stf_score;
			const scoreSection301 = scoreSection301Find.stf_score;
			const scoreSection302 = scoreSection302Find.stf_score;
			const scoreSection303 = scoreSection303Find.stf_score;
			const scoreSection304 = scoreSection304Find.stf_score;

			const sumScore = scoreSection101 + scoreSection201 + scoreSection202 + scoreSection203 + scoreSection301 + scoreSection302 + scoreSection303 + scoreSection304;

			return sumScore;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
