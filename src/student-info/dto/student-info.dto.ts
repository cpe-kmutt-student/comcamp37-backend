import { IsBoolean, IsEmail, IsInt, IsString, Length, Max, MaxLength, Min } from "class-validator";

export class StudentInfoDto {
	std_user_id;
	std_user;
	std_user_prefix;
	std_user_first_name;
	std_user_last_name;
	std_user_nick_name;
	std_info_age;
	std_info_birthdate;
	std_info_gender;
	std_info_religion;
	std_info_phone_number;
	std_info_education_level;
	std_info_education_institute;
	std_info_education_plan;
	std_info_parent_fullname;
	std_info_parent_relation;
	std_info_parent_phone_number;
	std_info_have_participated;
	std_info_have_laptop;
	std_info_can_participate_every_day;
	std_info_medical_insurance;
	std_info_chronic_disease;
	std_info_drug_allergy;
	std_info_food_allergy;
	std_info_blood_group;
	std_info_address;
	std_info_shirt_size;
	std_info_travel_plan;
	std_info_laptop_os;
	std_info_have_tablet;
	std_info_have_mouse;
}
